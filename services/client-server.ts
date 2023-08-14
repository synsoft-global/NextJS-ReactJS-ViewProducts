import qs from "qs";
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
import { getCookie, getCookies } from "cookies-next";
import StorageApi from "services/storage.service";

export interface ISingleEntityResponse<T> {
  data?: T;
  message: string;
  status: string;
}

export interface IListEntityResponse<T> {
  data?: T[];
  message: string;
  status: string;
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}

export default class ClientSr {
  baseUrl: string;
  headers: { Accept: string; "Content-Type": string };
  constructor() {
    this.baseUrl = BASE_URL || "";
    this.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  }

  _trimSpace(body) {
    if (
      body &&
      typeof body == "object" &&
      Object.keys(body) &&
      Object.keys(body).length > 0
    ) {
      Object.keys(body).map((item) => {
        // if (typeof body[item] === "string") {
        //   body[item] = body[item].trim();
        // }
        return body;
      });
    }
    return body;
  }

  _fetch(
    path,
    method,
    query,
    body = null,
    extraHeaders: any = {},
    image = null
  ) {
    let url = `${this.baseUrl}${path}`;

    if (query) {
      const q = qs.stringify(query);
      url = `${url}?${q}`;
    }

    if (typeof window !== "undefined") {
      const subDomainId = StorageApi.getItem("x-mengantar-id");
      if (subDomainId) {
        extraHeaders["x-mengantar-id"] = subDomainId;
      }
    }

    const options: any = {
      method,
      headers: { ...this.headers, ...extraHeaders },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }
    if (image !== null) {
      options.body = image;
      options.headers = { Accept: "application/json" };
    }

    return fetch(url, options);
  }

  GET(route, query = {}, extraHeaders = {}) {
    query = this._trimSpace(query);
    return this._fetch(route, "GET", query, null, extraHeaders);
  }

  POST(route, body, extraHeaders = {}, img = null) {
    body = this._trimSpace(body);
    return this._fetch(route, "POST", null, body, extraHeaders, img);
  }

  PUT(route, body, extraHeaders = {}) {
    body = this._trimSpace(body);
    return this._fetch(route, "PUT", null, body, extraHeaders);
  }

  DELETE(route, query, extraHeaders = {}) {
    query = this._trimSpace(query);
    return this._fetch(route, "DELETE", query, null, extraHeaders);
  }
}
