import { useRef, useState } from "react";
import { AddActionButton } from "../../components/AddActionButton";
import { Modal } from "../../components/Modal";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import { setCanvasPreview } from "../../utils/setCanvasPreview";
import { useAuthContext } from "../../context/AuthContext";
import { uploadImage } from "../../services/uploadImage";
import toast from "react-hot-toast";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

export const ImageCropper = ({ isOpen, setIsOpen, cardRef }) => {
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState({});
  const imgRef = useRef();
  const previewCanvasRef = useRef();
  const { authUser, setAuthUser } = useAuthContext();

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const handleInput = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageUrl = reader.result?.toString() || "";
      setImgSrc(imageUrl);
    });

    reader.readAsDataURL(file);
  };

  const handleCropImage = () => {
    if (!crop || !imgRef.current || !previewCanvasRef.current) return;

    setCanvasPreview(
      imgRef.current,
      previewCanvasRef.current,
      convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
    );

    previewCanvasRef.current.toBlob(async (blob) => {
      if (!blob) return;

      const file = new File([blob], `${authUser.email}-profile-pic.jpg`, {
        type: "image/jpeg",
      });

      try {
        const profilePic = await uploadImage(file, authUser.email);

        const newUser = { ...authUser, profilePic };
        localStorage.setItem("bridge-user", JSON.stringify(newUser));
        setAuthUser(newUser);

        toast.success("Foto actualizada correctamente");
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsOpen(false);
      }
    }, "image/jpeg");
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} cardRef={cardRef}>
      <div className="flex flex-col items-center w-full">
        <label className="block mb-3 w-fit">
          <span className="sr-only">Elige una foto de perfil</span>
          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2
        file:rounded-full file:border-0 file:text-xs file:bg-[#00BCC6] file:text-white hover:file:bg-[#01AAB3]"
            onChange={handleInput}
          />
        </label>
        {imgSrc && (
          <div className="flex flex-col items-center gap-2">
            <ReactCrop
              crop={crop}
              circularCrop
              keepSelection
              aspect={ASPECT_RATIO}
              minWidth={MIN_DIMENSION}
              onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            >
              <img
                src={imgSrc}
                alt="Upload"
                style={{ maxHeight: "70vh" }}
                ref={imgRef}
                onLoad={onImageLoad}
              />
            </ReactCrop>
            <AddActionButton text={"Cortar imagen"} onClick={handleCropImage} />
          </div>
        )}
        {crop && (
          <canvas
            className="mt-4"
            ref={previewCanvasRef}
            style={{
              display: "none",
              border: "1px solid black",
              objectFit: "contain",
              width: 150,
              height: 150,
            }}
          />
        )}
      </div>
    </Modal>
  );
};
