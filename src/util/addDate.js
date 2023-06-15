import "datejs";

let today = new Date();

export const formatDate = today.toString("yyyy-MM-dd HH:mm:ss");

export const todayDate = formatDate.split(" ")[0];
export const todayTime = formatDate.split(" ")[1];
