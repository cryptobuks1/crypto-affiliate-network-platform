async function uploadFiles(req, res) {
  if (req.files && req.files.length > 0) {
    return res.json({
      message: `uploaded ${req.files.length} files`,
      success: true,
      data: req.files.map((file) => file.filename),
    });
  }

  return res.json({
    message: "you must upload at least one file",
    success: false,
    data: null,
  });
}

export default uploadFiles;
