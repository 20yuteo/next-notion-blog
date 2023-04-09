import { extendTheme } from "@chakra-ui/react";

const Theme = extendTheme({
    styles: {
        global: {
            "html, body, div#__next, div.css-j7qwjs": {
                height: "100%"
            }
        },
    }
});

export default Theme;