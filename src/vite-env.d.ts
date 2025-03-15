/// <reference types="vite/client" />

declare module '@iconscout/react-unicons' {
    import { FC, SVGProps } from 'react'
    export interface IconProps extends SVGProps<SVGElement> {
        size?: string | number
        color?: string
    }
    export const UilClinicMedical: FC<IconProps>
    export const UilCog: FC<IconProps>
    export const UilBars: FC<IconProps>
    export const UilTimes: FC<IconProps>
}
