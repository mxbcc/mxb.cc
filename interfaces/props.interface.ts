import * as React from 'react';
import { Metadata } from "./meta.interface";

export interface ConfigProps {
    config?: {
        serverRuntimeConfig: any;
    }
}

export interface BaseProps {
    id?: string;
    key?: string;
    style?: React.CSSProperties;
    className?: string;
    meta?: Metadata;
    children?: React.ReactNode;
}
