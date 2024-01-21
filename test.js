import responseSaver from "./index.js";

responseSaver({
  timeout: process.env.TIMEOUT && Number(process.env.TIMEOUT),
  pageLimit: process.env.PAGE_LIMIT && Number(process.env.PAGE_LIMIT),
  directory: process.env.DIR ?? "data",
})
  .then(() => {
    console.log("done");
  })
  .catch((err) => {
    console.log("Something went wrong");
    console.error(err);
  });
