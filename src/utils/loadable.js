import L from "react-loadable";
import Loading from "components/loading";

const loadable = url => {
  return L({
    loading: Loading,
    loader: () => import(`pages/${url}`)
  });
};

export default loadable;
