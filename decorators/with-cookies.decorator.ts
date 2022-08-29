import { withCookies } from "react-cookie";

export function WithCookies(): ClassDecorator {
    return (target) => {
        return withCookies(target as any) as any;
    };
}
