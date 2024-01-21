import fs from "node:fs/promises";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { NotFoundError, WriteFileError } from "./errors.js";

export const fetching = async ({ url }) => {
  const response = await fetch(url);
  if (response.status === 404) throw new NotFoundError();
  const json = await response.json();
  return json;
};

export const setPageToUrl = (url, page) => {
  if (url.includes("page=")) {
    url = url.replace(/page=\d+/, `page=${page}`);
  } else if (url.includes("?")) {
    url = `${url}&page=${page}`;
  } else {
    url = `${url}?page=${page}`;
  }

  return url;
};

export const wait = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const saveFile = async (name, data) => {
  try {
    const filePath = path.resolve(name);
    const directory = path.dirname(filePath);

    if (!existsSync(directory)) {
      mkdirSync(directory, { recursive: true });
    }
    await fs.writeFile(filePath, JSON.stringify(data));
  } catch (error) {
    console.log(error);
    throw new WriteFileError();
  }
};
