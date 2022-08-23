import "moment/locale/pt-br";
import moment from "moment";

export const calcAge = (value: string): number => {
  return moment().diff(value, "years");
};
