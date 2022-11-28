import { useEffect, useState } from "react";

const useJWToken = (email) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    if (email) {
      fetch(`${process.env.REACT_APP_HOST_LINK}/jwt?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.accessToken) {
            localStorage.setItem("access-token", data.accessToken);
            setToken(data.accessToken);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [email]);
  return [token];
};

export default useJWToken;
