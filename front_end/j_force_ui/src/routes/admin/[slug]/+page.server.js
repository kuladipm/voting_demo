export const load = async ({params}) => {
    console.log(params.slug)
	const data = params.slug
    return {data:data}
}