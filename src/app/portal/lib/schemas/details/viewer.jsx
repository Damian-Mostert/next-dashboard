"use client";

import TableMap from "../components/table-map";
import { useEffect, useState } from "react";
import callApi from "@portal/lib/js/call-api";
import Loader from "@portal/lib/components/global/loader";
import Container from "@portal/lib/components/global/container";

export default function Viewer({ params, buttons_config }) {

    const [items, setItems] = useState(null);

    const loadItems = async () => {
        const data = await callApi(params, {});
        setItems(data);
    };
    useEffect(() => {
        loadItems();
    }, [params]);

    console.log("items",items)

    return (
        <Container type="scrollable">
            {items && <TableMap data={items}/>}
            {!items && <Loader text={"Loading details..."}/>}
        </Container>
    );
}
