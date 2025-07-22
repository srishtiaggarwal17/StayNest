// import multer from "multer";
// const storage = multer.memoryStorage();
// export const upload = multer({ storage }).single("file");

import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });
export default upload;

