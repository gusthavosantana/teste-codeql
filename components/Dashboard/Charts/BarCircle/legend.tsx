import Image from "next/image";
import { Box, Typography } from '@mui/material';

const labelStyle = {
    display: 'flex',
    alignItems: 'flex-end',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.25px',
    color: 'rgba(0, 0, 0, 0.6)',
    marginRight: '6px',
    maxWidth: 100,
};

const valueStyle = {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '28px',
    lineHeight: '36px',
    color: '#000000',
};

interface LegendProps {
    label: string;
    value: string;
    color: any;
}

export function BarCircleLegend({ label, value, color }: LegendProps) {
    return (
        <Box>
            <Box sx={{
                width: '100%'
            }}>
                <Typography variant="subtitle1" sx={labelStyle}>
                    {label}
                    <div style={{
                        width: 10,
                        height: 10,
                        background: color,
                        borderRadius: 2,
                        marginBottom: 3,
                        marginLeft: 5
                    }} />
                </Typography>
            </Box>
            <Typography variant="h6" sx={valueStyle}>
                {value}
            </Typography>
        </Box>
    );
}