import { getCookie } from "cookies-next";

export function withAuth(gssp) {
  return async (context) => {
    const token = getCookie('token', { req: context.req, res: context.res });
    if (!token) {
      return {
        redirect: {
          permanent: false,
          destination: "/login"
        }
      }
    }
    const gsspData = await gssp(context);
    return {
      props: {
        ...gsspData.props,
      },
    };
  };
}

export default withAuth;
