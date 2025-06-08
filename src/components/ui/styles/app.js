import styled from "styled-components"

export const AppStyles = styled.div`
padding: 20px;
    .region {
    margin-top: 20px;
    font-family: sans-serif;
    }

    .region-title {
    font-weight: bold;
    margin-bottom: 8px;
    }

    .region-row {
        display: flex;
        flex-wrap: wrap; 
        gap: 12px;
        align-items: center;
    }

    .region-item {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .color {
        width: 14px;
        height: 14px;
        border-radius: 3px;
    }
    .year,
    .total {
        position: absolute;
        right: 40px;

        font-weight: 700;
        color:rgb(117, 116, 116);
    }
    .year{
        margin-top: -180px;
        font-size: 70px;
    }
    .total {
        font-size: 40px;
        margin-top: -100px;
    }


`