import background from "../Assets/Image/bg.jpg";
import logo from "../Assets/Image/logo.png";

export const introStyles = {
  intro: { marginLeft: "10%", position: "absolute" },
  header: {
    color: "#F82249",
    padding: 30,
    fontSize: 120,
    fontFamily: "calibri",
  },
  info: {
    color: "white",
    paddingLeft: 60,
    fontSize: 40,
    fontFamily: "calibri",
  },
};
export const navbarStyles = {
  background: { backgroundImage: `url(${background})` },
  logosrc: logo,
  button: {
    borderRadius: 5,
    borderColor: "white",
    padding: 10,
    marginLeft: 5,
    backgroundColor: "#F82249",
    fontSize: 15,
    color: "white",
  },
  profileCard: {
    padding: 10,
    backgroundColor: "#E6E6E6",
    borderRadius: 5,
    borderColor: "white",
  },
};
export const loginFormStyles = {
  container: { textAlign: "end", margin: "10%" },
  intro: {
    fontSize: 50,
    marginRight: 70,
    color: "white",
    fontFamily: "calibri",
  },
  form: { alignItems: "center" },
  input: {
    width: 300,
    height: 40,
    borderRadius: 5,
    borderColor: "white",
    margin: 5,
    backgroundColor: "#E6E6E6",
  },
  button: {
    width: 100,
    height: 40,
    borderRadius: 5,
    borderColor: "white",
    margin: 5,
    backgroundColor: "#F82249",
    fontSize: 15,
  },
  loss: {
    color: "#E6E6E6",
    fontFamily: "calibri",
    padding: 10,
  },
  register: {
    color: "#E6E6E6",
    fontFamily: "calibri",
    padding: 10,
    fontSize: 15,
  },
};
export const aboutStyles = {
  container: {
    border: "3px solid",
    borderColor: "#F82249",
    borderRadius: 5,
    backgroundColor: "#E6E6E6",
  },
  header: {
    fontSize: 50,
    marginLeft: 50,
    fontFamily: "calibri",
  },
  info: {
    fontFamily: "calibri",
    fontSize: 20,
  },
};
export const menuStyles = {
  buttons: {
    width: "100%",
    height: "20%",
    marginBottom: 5,
  },
  activeButton: {
    width: "100%",
    height: "20%",
    marginBottom: 5,
    backgroundColor: "#E6E6E6",
    color: "black",
  },
};
