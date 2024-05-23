"use client";
import { useState, useEffect } from "react";
import { S3 } from "aws-sdk";
import { useDispatch } from "react-redux";
import { addProductsToServer } from "@/redux/Products";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// import UploadAdapter from "@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter";
// import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
// import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat";
// import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";

// import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
// import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough";
// import Subscript from "@ckeditor/ckeditor5-basic-styles/src/subscript";
// import Superscript from "@ckeditor/ckeditor5-basic-styles/src/superscript";
// import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";

// // import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices.js';

// import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
// import Font from "@ckeditor/ckeditor5-font/src/font";
// import Heading from "@ckeditor/ckeditor5-heading/src/heading";
// import Highlight from "@ckeditor/ckeditor5-highlight/src/highlight";
// import HorizontalLine from "@ckeditor/ckeditor5-horizontal-line/src/horizontalline";
// // import GeneralHtmlSupport from '@ckeditor/ckeditor5-html-support/src/generalhtmlsupport';
// import AutoImage from "@ckeditor/ckeditor5-image/src/autoimage";
// import Image from "@ckeditor/ckeditor5-image/src/image";
// import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
// import ImageInsert from "@ckeditor/ckeditor5-image/src/imageinsert";
// import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";
// import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
// import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
// import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
// import Base64UploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter";
// import PictureEditing from "@ckeditor/ckeditor5-image/src/pictureediting";
// import Indent from "@ckeditor/ckeditor5-indent/src/indent";
// import IndentBlock from "@ckeditor/ckeditor5-indent/src/indentblock";

// import AutoLink from "@ckeditor/ckeditor5-link/src/autolink";
// import Link from "@ckeditor/ckeditor5-link/src/link";
// import LinkImage from "@ckeditor/ckeditor5-link/src/linkimage";
// import List from "@ckeditor/ckeditor5-list/src/list";
// import ListProperties from "@ckeditor/ckeditor5-list/src/listproperties";
// import TodoList from "@ckeditor/ckeditor5-list/src/todolist";
// import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
// import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice";

// import TextTransformation from "@ckeditor/ckeditor5-typing/src/texttransformation";

const REDUCED_MATERIAL_COLORS = [
  { label: "Red 50", color: "#ffebee" },
  { label: "Purple 50", color: "#f3e5f5" },
  { label: "Indigo 50", color: "#e8eaf6" },
  { label: "Blue 50", color: "#e3f2fd" },
  { label: "Cyan 50", color: "#e0f7fa" },
  { label: "Teal 50", color: "#e0f2f1" },
  { label: "Light green 50", color: "#f1f8e9" },
  { label: "Lime 50", color: "#f9fbe7" },
  { label: "Amber 50", color: "#fff8e1" },
  { label: "Orange 50", color: "#fff3e0" },
  { label: "Grey 50", color: "#fafafa" },
  { label: "Blue grey 50", color: "#eceff1" },
  { label: "Red 100", color: "#ffcdd2" },
  { label: "Purple 100", color: "#e1bee7" },
  { label: "Indigo 100", color: "#c5cae9" },
  { label: "Blue 100", color: "#bbdefb" },
  { label: "Cyan 100", color: "#b2ebf2" },
  { label: "Teal 100", color: "#b2dfdb" },
  { label: "Light green 100", color: "#dcedc8" },
  { label: "Lime 100", color: "#f0f4c3" },
  { label: "Amber 100", color: "#ffecb3" },
  { label: "Orange 100", color: "#ffe0b2" },
  { label: "Grey 100", color: "#f5f5f5" },
  { label: "Blue grey 100", color: "#cfd8dc" },
  { label: "Red 200", color: "#ef9a9a" },
  { label: "Purple 200", color: "#ce93d8" },
  { label: "Indigo 200", color: "#9fa8da" },
  { label: "Blue 200", color: "#90caf9" },
  { label: "Cyan 200", color: "#80deea" },
  { label: "Teal 200", color: "#80cbc4" },
  { label: "Light green 200", color: "#c5e1a5" },
  { label: "Lime 200", color: "#e6ee9c" },
  { label: "Amber 200", color: "#ffe082" },
  { label: "Orange 200", color: "#ffcc80" },
  { label: "Grey 200", color: "#eeeeee" },
  { label: "Blue grey 200", color: "#b0bec5" },
  { label: "Red 300", color: "#e57373" },
  { label: "Purple 300", color: "#ba68c8" },
  { label: "Indigo 300", color: "#7986cb" },
  { label: "Blue 300", color: "#64b5f6" },
  { label: "Cyan 300", color: "#4dd0e1" },
  { label: "Teal 300", color: "#4db6ac" },
  { label: "Light green 300", color: "#aed581" },
  { label: "Lime 300", color: "#dce775" },
  { label: "Amber 300", color: "#ffd54f" },
  { label: "Orange 300", color: "#ffb74d" },
  { label: "Grey 300", color: "#e0e0e0" },
  { label: "Blue grey 300", color: "#90a4ae" },
  { label: "Red 400", color: "#ef5350" },
  { label: "Purple 400", color: "#ab47bc" },
  { label: "Indigo 400", color: "#5c6bc0" },
  { label: "Blue 400", color: "#42a5f5" },
  { label: "Cyan 400", color: "#26c6da" },
  { label: "Teal 400", color: "#26a69a" },
  { label: "Light green 400", color: "#9ccc65" },
  { label: "Lime 400", color: "#d4e157" },
  { label: "Amber 400", color: "#ffca28" },
  { label: "Orange 400", color: "#ffa726" },
  { label: "Grey 400", color: "#bdbdbd" },
  { label: "Blue grey 400", color: "#78909c" },
  { label: "Red 500", color: "#f44336" },
  { label: "Purple 500", color: "#9c27b0" },
  { label: "Indigo 500", color: "#3f51b5" },
  { label: "Blue 500", color: "#2196f3" },
  { label: "Cyan 500", color: "#00bcd4" },
  { label: "Teal 500", color: "#009688" },
  { label: "Light green 500", color: "#8bc34a" },
  { label: "Lime 500", color: "#cddc39" },
  { label: "Amber 500", color: "#ffc107" },
  { label: "Orange 500", color: "#ff9800" },
  { label: "Grey 500", color: "#9e9e9e" },
  { label: "Blue grey 500", color: "#607d8b" },
  { label: "Red 600", color: "#e53935" },
  { label: "Purple 600", color: "#8e24aa" },
  { label: "Indigo 600", color: "#3949ab" },
  { label: "Blue 600", color: "#1e88e5" },
  { label: "Cyan 600", color: "#00acc1" },
  { label: "Teal 600", color: "#00897b" },
  { label: "Light green 600", color: "#7cb342" },
  { label: "Lime 600", color: "#c0ca33" },
  { label: "Amber 600", color: "#ffb300" },
  { label: "Orange 600", color: "#fb8c00" },
  { label: "Grey 600", color: "#757575" },
  { label: "Blue grey 600", color: "#546e7a" },
  { label: "Red 700", color: "#d32f2f" },
  { label: "Purple 700", color: "#7b1fa2" },
  { label: "Indigo 700", color: "#303f9f" },
  { label: "Blue 700", color: "#1976d2" },
  { label: "Cyan 700", color: "#0097a7" },
  { label: "Teal 700", color: "#00796b" },
  { label: "Light green 700", color: "#689f38" },
  { label: "Lime 700", color: "#afb42b" },
  { label: "Amber 700", color: "#ffa000" },
  { label: "Orange 700", color: "#f57c00" },
  { label: "Grey 700", color: "#616161" },
  { label: "Blue grey 700", color: "#455a64" },
  { label: "Red 800", color: "#c62828" },
  { label: "Purple 800", color: "#6a1b9a" },
  { label: "Indigo 800", color: "#283593" },
  { label: "Blue 800", color: "#1565c0" },
  { label: "Cyan 800", color: "#00838f" },
  { label: "Teal 800", color: "#00695c" },
  { label: "Light green 800", color: "#558b2f" },
  { label: "Lime 800", color: "#9e9d24" },
  { label: "Amber 800", color: "#ff8f00" },
  { label: "Orange 800", color: "#ef6c00" },
  { label: "Grey 800", color: "#424242" },
  { label: "Blue grey 800", color: "#37474f" },
  { label: "Red 900", color: "#b71c1c" },
  { label: "Purple 900", color: "#4a148c" },
  { label: "Indigo 900", color: "#1a237e" },
  { label: "Blue 900", color: "#0d47a1" },
  { label: "Cyan 900", color: "#006064" },
  { label: "Teal 900", color: "#004d40" },
  { label: "Light green 900", color: "#33691e" },
  { label: "Lime 900", color: "#827717" },
  { label: "Amber 900", color: "#ff6f00" },
  { label: "Orange 900", color: "#e65100" },
  { label: "Grey 900", color: "#212121" },
  { label: "Blue grey 900", color: "#263238" },
];

const plugins = [
  // Alignment,
  // Autoformat,
  // AutoImage,
  // AutoLink,
  // Bold,
  // // CloudServices,
  // Essentials,
  // Font,
  // // GeneralHtmlSupport,
  // Heading,
  // Highlight,
  // HorizontalLine,
  // Image,
  // ImageCaption,
  // ImageInsert,
  // ImageResize,
  // ImageStyle,
  // ImageToolbar,
  // ImageUpload,
  // Base64UploadAdapter,
  // Indent,
  // IndentBlock,
  // Italic,
  // Link,
  // LinkImage,
  // List,
  // ListProperties,
  // Paragraph,
  // PasteFromOffice,
  // PictureEditing,
  // Strikethrough,
  // Subscript,
  // Superscript,
  // TextTransformation,
  // TodoList,
  // Underline,
  // UploadAdapter,
];

export default function AddProducts() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState([]);
  async function fetchCategries() {
    const res = await fetch("http://localhost:3000/api/categories");
    setCategory(await res.json());
  }

  const [error, setError] = useState(null);
  const [uploadLink, setUploadLink] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [labels, setLabels] = useState([]);
  const [brands, setBrands] = useState([]);

  const [productName, setProductName] = useState("");
  const [productPriceSingle, setProductPriceSingle] = useState("");
  const [productPriceWholesale, setProductPriceWholesale] = useState("");
  const [productAttribute, setProductAttribute] = useState("");
  const [productLabel, setProductLabel] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productCategeory, setProductCategeory] = useState([]);

  const addAttribute = "ADD_ATTRIBUTE";
  const addLabel = "ADD_LABEL";

  const ACCESSKEY = "f28ilb63q187h5h6";
  const SECRETKEY = "7d51a9f2-09ff-4587-8b7a-59b81fd5b612";
  const ENDPOINT = "https://storage.iran.liara.space/Products";
  const BUCKET = "toolshop";

  const s3 = new S3({
    accessKeyId: ACCESSKEY,
    secretAccessKey: SECRETKEY,
    endpoint: ENDPOINT,
  });

  const handleFileChange = async (event) => {
    try {
      if (!event.target.files[0]) {
        setError("Please select a file");
        return;
      }

      [...event.target.files].map(async (file) => {
        const params = {
          Bucket: BUCKET,
          Key: `${Date.now()}_${file.name}`,
          Body: file,
        };

        const response = await s3.upload(params).promise();

        setUploadLink((prevLinks) => [...prevLinks, response.Location]);

        alert("File uploaded successfully");
      });
    } catch (error) {
      setError("Error uploading file: " + error.message);
    }
  };

  async function addProductHandler(e) {
    e.preventDefault();
    const ReqBody = {
      name: productName.trim(),
      price: +productPriceSingle,
      wholesale: {
        price: +productPriceWholesale,
        number: 4,
      },
      labels,
      attributes,
      brand: productBrand,
      category: {
        main: productCategeory[0],
        sub: productCategeory[1],
      },
      img: uploadLink,
    };

    const res = dispatch(addProductsToServer({ url: "http://localhost:3000/api/products", body: ReqBody }));

    if (res.meta.requestStatus === "fulfilled") {
      setLabels([]);
      setAttributes([]);
      setUploadLink("");
      setProductName("");
      setProductPriceSingle("");
      setProductPriceWholesale("");
      setProductAttribute("");
      setProductLabel("");

      alert("Added :)");
    }
  }

  function addInfoHandler(data) {
    return () => {
      const attribute = productAttribute.trim();
      const label = productLabel.trim();
      switch (data) {
        case addAttribute:
          attribute && setAttributes((prevList) => [...prevList, attribute]);
          break;
        case addLabel:
          label && setLabels((prevList) => [...prevList, label]);
          break;
      }
    };
  }

  useEffect(() => {
    fetchCategries();
    fetchBrands();
  }, []);

  async function fetchBrands() {
    const res = await fetch("http://localhost:3000/api/brands");
    if (res.status === 200) {
      const data = await res.json();
      setBrands(data);
    } else {
      setBrands([]);
    }
  }

  return (
    <div className="bg-background flex-1 w-2/3">
      <h3 className="text-3xl font-bold m-4">افزودن محصولات</h3>
      <hr />
      <form onSubmit={addProductHandler}>
        <div className="flex w-full">
          <label className="flex-1 input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
              type="text"
              className="grow"
              placeholder="نام محصول ..."
            />
          </label>
          <select
            onChange={(e) => setProductCategeory(e.target.value)}
            value={productCategeory}
            className="select select-bordered w-full max-w-xs"
          >
            {category?.map((item) => {
              return (
                <optgroup className="font-bold" key={item._id} label={item.name}>
                  {item?.subs.map((sub, index) => {
                    return (
                      <option key={item._id + index} value={[item.name, sub]}>
                        {sub}
                      </option>
                    );
                  })}
                </optgroup>
              );
            })}
          </select>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                onChange={(e) => setProductPriceSingle(e.target.value)}
                value={productPriceSingle}
                type="number"
                className="grow"
                placeholder="قیمت تکی محصول ..."
              />
            </label>
          </div>
          <div className="flex-1">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                onChange={(e) => setProductPriceWholesale(e.target.value)}
                value={productPriceWholesale}
                type="number"
                className="grow"
                placeholder="قیمت عمده محصول ..."
              />
            </label>
          </div>
        </div>
        <select
          onChange={(e) => setProductBrand(e.target.value)}
          value={productBrand}
          className="select select-bordered w-full max-w-xs"
        >
          {brands?.map((item) => {
            return (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            );
          })}
        </select>
        <input type="file" onChange={handleFileChange} multiple />
        {/* <img src={uploadLink} alt="Image" /> */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="input input-bordered flex items-center gap-2">
              <button
                type="button"
                onClick={addInfoHandler(addAttribute)}
                className="bg-primary text-white w-6 h-6 flex items-center justify-center rounded-full"
              >
                +
              </button>
              <input
                onChange={(e) => setProductAttribute(e.target.value)}
                value={productAttribute}
                type="text"
                className="grow"
                placeholder="ویژگی های محصول ..."
              />
            </label>
            <ul>
              {attributes.map((item, index) => {
                return <li key={index}>{item}</li>;
              })}
            </ul>
          </div>
          <div className="flex-1">
            <label className="input input-bordered flex items-center gap-2">
              <button
                type="button"
                onClick={addInfoHandler(addLabel)}
                className="bg-primary text-white w-6 h-6 flex items-center justify-center rounded-full"
              >
                +
              </button>
              <input
                onChange={(e) => setProductLabel(e.target.value)}
                value={productLabel}
                type="text"
                className="grow"
                placeholder="برچسب های محصول ..."
              />
            </label>
            <ul>
              {labels.map((item, index) => {
                return <li key={index}>{item}</li>;
              })}
            </ul>
          </div>
        </div>
        <CKEditor
          editor={ClassicEditor}
          config={{
            language: "fa",
            placeholder: "با عرض سلام",
            // plugins,
            toolbar: {
              shouldNotGroupWhenFull: true,
              items: [
                "undo",
                "redo",
                "|",
                "heading",
                "|",
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "|",
                "link",
                "insertImage",
                {
                  label: "Basic styles",
                  icon: "text",
                  items: ["fontSize", "fontFamily", "fontColor", "fontBackgroundColor", "highlight"],
                },
                "alignment",
                "|",
                "bulletedList",
                "numberedList",
                "outdent",
                "indent",
                "horizontalLine",
              ],
            },
            fontFamily: {
              supportAllValues: true,
            },
            fontSize: {
              options: [10, 12, 14, "default", 18, 20, 22],
              supportAllValues: true,
            },
            fontColor: {
              columns: 12,
              colors: REDUCED_MATERIAL_COLORS,
            },
            fontBackgroundColor: {
              columns: 12,
              colors: REDUCED_MATERIAL_COLORS,
            },
            heading: {
              options: [
                { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
                {
                  model: "heading1",
                  view: "h1",
                  title: "Heading 1",
                  class: "ck-heading_heading1",
                },
                {
                  model: "heading2",
                  view: "h2",
                  title: "Heading 2",
                  class: "ck-heading_heading2",
                },
                {
                  model: "heading3",
                  view: "h3",
                  title: "Heading 3",
                  class: "ck-heading_heading3",
                },
                {
                  model: "heading4",
                  view: "h4",
                  title: "Heading 4",
                  class: "ck-heading_heading4",
                },
                {
                  model: "heading5",
                  view: "h5",
                  title: "Heading 5",
                  class: "ck-heading_heading5",
                },
                {
                  model: "heading6",
                  view: "h6",
                  title: "Heading 6",
                  class: "ck-heading_heading6",
                },
              ],
            },
          }}
          data="<p></p>"
          onReady={(editor) => {
            console.log("CKEditor5 React Component is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
        />
        <button className="btn btn-block btn-primary" type="submit">
          افزودن محصول
        </button>
      </form>
    </div>
  );
}
