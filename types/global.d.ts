interface IconProps {
    strokeWidth: number;
    size: number;
}

declare module "*.svg" {
    const content: string;
    export default content;
}