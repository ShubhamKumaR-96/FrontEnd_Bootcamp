import React, { useContext } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Create = () => {
  const [products, setProducts] = useContext(ProductContext);
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Formik initial values and validation schema using Yup
  const formik = useFormik({
    initialValues: {
      title: "",
      image: "",
      category: "",
      price: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      image: Yup.string().url("Invalid URL").required("Image URL is required"),
      category: Yup.string().required("Category is required"),
      price: Yup.number()
        .required("Price is required")
        .positive("Price must be positive"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const product = {
        id: nanoid(),
        ...values,
      };
      setProducts([...products, product]);
      toast.success("Product added successfully");
      resetForm();
      setInterval(()=>{
        navigate('/')
      },5000)
    },
  });

  return (
    <>
      {/* Position the button at the top-left corner */}
      <button
        className="fixed top-4 left-4 px-4 py-2 bg-blue-500 text-white rounded z-50"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>

      <form
        className="flex flex-col items-center p-[5%] w-screen h-screen"
        onSubmit={formik.handleSubmit}
      >
        <h1 className="mb-5 w-1/2 text-3xl">Add a Product</h1>
        <input
          type="url"
          className="text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
          {...formik.getFieldProps("image")}
          placeholder="image-link"
        />
        {formik.touched.image && formik.errors.image ? (
          <div className="text-red-500">{formik.errors.image}</div>
        ) : null}

        <input
          type="text"
          className="text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
          {...formik.getFieldProps("title")}
          placeholder="title"
        />
        {formik.touched.title && formik.errors.title ? (
          <div className="text-red-500">{formik.errors.title}</div>
        ) : null}

        <div className="w-1/2 flex justify-between gap-10">
          <input
            type="text"
            className="text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
            {...formik.getFieldProps("category")}
            placeholder="category"
          />
          {formik.touched.category && formik.errors.category ? (
            <div className="text-red-500">{formik.errors.category}</div>
          ) : null}

          <input
            type="number"
            className="text-2xl bg-zinc-100 rounded p-3 w-1/2 mb-3"
            {...formik.getFieldProps("price")}
            placeholder="price"
          />
          {formik.touched.price && formik.errors.price ? (
            <div className="text-red-500">{formik.errors.price}</div>
          ) : null}
        </div>

        <textarea
          className="text-2xl bg-zinc-100 rounded p-3 h-1/2 w-1/2 mb-3"
          {...formik.getFieldProps("description")}
          placeholder="Description"
        ></textarea>
        {formik.touched.description && formik.errors.description ? (
          <div className="text-red-500">{formik.errors.description}</div>
        ) : null}

        <div className="w-1/2">
          <button
            type="submit"
            className="py-2 px-5 border border-blue-800 hover:bg-blue-800 text-white bg-blue-600 text-xl"
          >
            Add New Product
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default Create;
