type Proxy = {
  status: "ACTIVE" | "INACTIVE";
  proxyCode: string;
  method: HttpMethod;
  url: string;
  parameter: {
    key: string;
    value: string;
  }[];
  header: {
    key: string;
    value: string;
  }[];
  body: {
    key: string;
    value: string;
  }[]
}