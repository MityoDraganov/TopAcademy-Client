/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			"hebbkx1anhila5yf.public.blob.vercel-storage.com",
			"images.immediate.co.uk",
			"edamam-product-images.s3.amazonaws.com",
			"img.spoonacular.com"
		],
	},
	reactStrictMode: false,
};

export default nextConfig;
