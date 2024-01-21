import { config } from "dotenv";
import { NotFoundError } from "./utils/errors.js";
import { fetching, saveFile, setPageToUrl, wait } from "./utils/helpers.js";
config();

const API_URL = process.env.API_URL;

async function responseSaver({ timeout, pageLimit, directory } = {}) {
  let curPage = 1;
  let isFinished = false;
  let url = API_URL;
  const errors = [];

  // TODO: stop when is constantly failing
  while (!isFinished) {
    try {
      url = setPageToUrl(url, curPage);
      const result = await fetching({ url });
      await saveFile(`${directory}/${curPage.toString()}.json`, result);
      if (curPage >= pageLimit) {
        isFinished = true;
        return;
      }
      if (timeout) await wait(timeout);
    } catch (error) {
      if (error instanceof NotFoundError) {
        isFinished = true;
      } else {
        errors.push({
          page: curPage,
          error,
          url: "",
        });
      }
    } finally {
      curPage += 1;
    }
  }
}

export default responseSaver;
