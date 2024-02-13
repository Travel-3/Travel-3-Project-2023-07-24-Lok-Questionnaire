declare namespace React {
  export interface CSSProperties extends CSS.Properties<string | number> {
    "--stroke-width"?: string | number;
    "--stroke-color"?: string;
  }
}
