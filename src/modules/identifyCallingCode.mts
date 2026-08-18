import intlTelInput from "intl-tel-input";
import "intl-tel-input/dist/css/intlTelInput.css";
import flags from "intl-tel-input/dist/img/flags.webp";
import flags2x from "intl-tel-input/dist/img/flags@2x.webp";

export function identifyCallingCode(){
   
const input = document.querySelector("#phone") as HTMLInputElement;
const iti = intlTelInput(input, {
    initialCountry: "cm",
    loadUtils: () => import("intl-tel-input/utils"),
    placeholderNumberPolicy: "AGGRESSIVE"
});

document.documentElement.style.setProperty(
  "--iti-path-flags-1x", 
  `url(${flags})`
);

document.documentElement.style.setProperty(
  "--iti-path-flags-2x",
  `url(${flags2x})`
);

return iti
}

