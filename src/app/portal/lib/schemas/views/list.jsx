import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';
import Container from "@portal/lib/components/global/container";
import TopBar from "@portal/lib/components/global/bars/top";
import getButtons from "@portal/lib/js/get-buttons";
import Button from "@portal/lib/components/global/button";
import Loader from "@portal/lib/components/global/loader";
import callApi from "@portal/lib/js/call-api";
import { camelToReadable } from '@portal/lib/js/camel-to-readable';
import { useTheme } from '@src/lib/js/use-theme';

export default function List({ params, buttons_config }) {
	const router = useRouter();
	const buttons = getButtons();
	const search = useSearchParams();
	const [filter, setFilter] = useState(false);
    const {theme} = useTheme();

	useEffect(() => {
		if (search.get("filter")) {
			const keys = {};
			search.forEach((value, key) => {
				keys[key] = value;
			});
			setFilter(keys);
		} else {
			setFilter(null);
		}
	}, [search]);

	const [items, setItems] = useState(null);
	const [columns, setColumns] = useState([]);

	const loadItems = async () => {
		const data = await callApi(params, {});
		setItems(data);
		if (data.length > 0) {
			setColumns(Object.keys(data[0]).filter(key => typeof data[0][key] === "string").filter(key => (key !== "__v")));
		}
	};

	useEffect(() => {
		loadItems();
	}, [params]);

	const buildFilteredString = () => {
		return Object.keys(filter).map(k => camelToReadable(k)).join(" ");
	};

	return (
		<div className="w-full h-full">
			<Container type="scrollable" bar={<TopBar title={filter ? "Filtered " + buildFilteredString() : "All"} buttons={[
				...(filter ? [buttons.defilter] : [])
			]} />}>
				{items?.length === 0 && params.main !== "logs" && <Loader text={"No items found"} subtext={
					<>
						<div>Would you like to create a {params.model} item?</div>
						<div className="w-full flex justify-center pt-4">
							<Button onClick={() => router.push(`/portal/${params.main}/create/${params.model}`)} text="Create item" variant="update" />
						</div>
					</>
				} />}
				{items?.length === 0 && params.main === "logs" && <Loader text={"No items found"} subtext={<div>Empty log</div>} />}
				{items?.forbidden && <Loader text={"Forbidden"} subtext={"You can't access this part of the program"} />}
				{!items && !items?.forbidden && <Loader text={"Loading " + params.model + " " + params.main + "..."} />}
				{!items?.forbidden && items?.length > 0 && (
					<div className='w-full' style={{maxHeight:"0vh"}}>
						<DataTable
						fixedHeader={true}
						highlightOnHover={true}
						selectableRows={true}
						onRowClicked={(row) => {
							buttons_config.details && router.push(`/portal/${params.main}/details/${params.model}/${row._id}`);
						}}
                        theme={theme}
						columns={[
							...columns.map(k => ({ name: camelToReadable(k), selector: row => row[k] })),
							...(buttons_config.update || buttons_config.delete) ? [{
								name: "options",
								selector(row) {
									return (
										<div className='flex gap-1'>
											{buttons_config.update && <div className='px-2 cursor-pointer' onClick={() => router.push(`/portal/${params.main}/update/${params.model}/${row._id}`)}>
												<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24">
													<path fill='currentColor' d="M 19.171875 2 C 18.448125 2 17.724375 2.275625 17.171875 2.828125 L 16 4 L 20 8 L 21.171875 6.828125 C 22.275875 5.724125 22.275875 3.933125 21.171875 2.828125 C 20.619375 2.275625 19.895625 2 19.171875 2 z M 14.5 5.5 L 3 17 L 3 21 L 7 21 L 18.5 9.5 L 14.5 5.5 z"></path>
												</svg>
											</div>}
											{buttons_config.delete && <div className='px-2 cursor-pointer' onClick={() => router.push(`/portal/${params.main}/delete/${params.model}/${row._id}`)}>
												<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 30 30">
													<path fill='currentColor' d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
												</svg>
											</div>}
										</div>
									);
								}
							}]:[]
						]}
						data={items.map(i => ({ ...i }))}
					/>
					</div>
				)}
			</Container>
		</div>
	);
}

const light = {
	text: {
		primary: 'rgba(0, 0, 0, 0.87)',
		secondary: 'rgba(0, 0, 0, 0.54)',
		disabled: 'rgba(0, 0, 0, 0.38)',
	},
	background: {
		default: '#FFFFFF',
	},
	context: {
		background: '#e3f2fd',
		text: 'rgba(0, 0, 0, 0.87)',
	},
	divider: {
		default: 'rgba(0,0,0,.12)',
	},
	button: {
		default: 'rgba(0,0,0,.54)',
		focus: 'rgba(0,0,0,.12)',
		hover: 'rgba(0,0,0,.12)',
		disabled: 'rgba(0, 0, 0, .18)',
	},
	selected: {
		default: '#e3f2fd',
		text: 'rgba(0, 0, 0, 0.87)',
	},
	highlightOnHover: {
		default: '#EEEEEE',
		text: 'rgba(0, 0, 0, 0.87)',
	},
	striped: {
		default: '#FAFAFA',
		text: 'rgba(0, 0, 0, 0.87)',
	},
};

const dark = {
	text: {
		primary: 'rgba(255, 255, 255, 0.87)',
		secondary: 'rgba(255, 255, 255, 0.54)',
		disabled: 'rgba(255, 255, 255, 0.38)',
	},
	background: {
		default: '#303030',
	},
	context: {
		background: '#424242',
		text: 'rgba(255, 255, 255, 0.87)',
	},
	divider: {
		default: 'rgba(255,255,255,.12)',
	},
	button: {
		default: 'rgba(255,255,255,.54)',
		focus: 'rgba(255,255,255,.12)',
		hover: 'rgba(255,255,255,.12)',
		disabled: 'rgba(255, 255, 255, .18)',
	},
	selected: {
		default: '#757575',
		text: 'rgba(255, 255, 255, 0.87)',
	},
	highlightOnHover: {
		default: '#424242',
		text: 'rgba(255, 255, 255, 0.87)',
	},
	striped: {
		default: '#37474F',
		text: 'rgba(255, 255, 255, 0.87)',
	},
};

const table_styles = { dark, light };
