import { Link } from "react-router-dom";
import { useState } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./ProductCard.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ProductCard = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("Welcome to JinStore");
  const [openSnack, setOpenSnack] = useState({
    opens: false,
    vertical: "bottom",
    horizontal: "right",
  });

  const { vertical, horizontal, opens } = openSnack;

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") return; // Optional: ignore clickaway
    setOpenSnack({ ...openSnack, opens: false });
  };

  const handleAddToCart = async (e) => {
    e.preventDefault(); // Prevents Link navigation when clicking icon

    const token = localStorage.getItem("jwt");
    if (!token) {
      setAlertMsg("Please log in to add items to cart.");
      setOpen(true);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.id; // adjust based on your JWT structure

      const response = await axios.post(
        "https://ukkh4uvf1d.execute-api.eu-north-1.amazonaws.com/api/cart/add",
        {
          userId,
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        setAlertMsg("Product added to cart!");
        setOpenSnack({ ...openSnack, opens: true });
      } else {
        setAlertMsg("Failed to add to cart");
        setOpenSnack({ ...openSnack, opens: true });
      }
    } catch (error) {
      // console.error("Add to cart error:", error);
      setAlertMsg("Error adding product to cart");
      setOpenSnack({ ...openSnack, opens: true });
    }
  };

  const handleAddToWishlist = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwt");
    if (!token) {
      setAlertMsg("Please log in to add items to Wishlist.");
      setOpen(true);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.id; // adjust based on your JWT structure
      const response = await axios.post(
        "https://ukkh4uvf1d.execute-api.eu-north-1.amazonaws.com/api/wishlist/add",
        {
          userId,
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        setAlertMsg("Product added to Wishlist!");
        setOpenSnack({ ...openSnack, opens: true });
      } else {
        setAlertMsg("Failed to add to Wishlist");
        setOpenSnack({ ...openSnack, opens: true });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMsg = error.response.data?.message || "";
        if (errorMsg.includes("already in wishlist")) {
          setAlertMsg("Product is already in your Wishlist.");
        } else {
          setAlertMsg("Failed to add to Wishlist.");
        }
      } else {
        setAlertMsg("Error adding product to Wishlist.");
      }
      setOpenSnack({ ...openSnack, opens: true });
    }
  };

  return (
    <>
      <Link
        to={`/pdp`}
        state={{ productdata: product }}
        className="product-card"
      >
        <div className="product-image-box">
          <img
            className="product-image"
            src={product.image}
            alt={product.name}
          />
          {product.event ? (
            <span className={`badge ${product.event}`}>{product.event}</span>
          ) : (
            ""
          )}
          <div className="icon-overlay">
            <ShoppingCartIcon
              className="action-icon"
              titleAccess="Add to Cart"
              onClick={handleAddToCart}
            />
            <FavoriteBorderIcon
              className="action-icon"
              titleAccess="Add to Wishlist"
              onClick={handleAddToWishlist}
            />
          </div>
        </div>
        <h3 className="product-title">{product.name}</h3>
        <span className="product-price">
          <CurrencyRupeeIcon /> {product.price}
        </span>
      </Link>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={opens}
        onClose={handleSnackClose}
        message={alertMsg}
        key={"topcenter"}
        autoHideDuration={1200}
        className="productcard-snackbar"
      />

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className="productcard-dialog"
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ mt: 5 }}>{alertMsg}</DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Okay
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default ProductCard;
