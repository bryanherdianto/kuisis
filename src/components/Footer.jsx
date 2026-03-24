import Logo from "/kuisis-white.svg";

function Footer() {
	return (
		<footer className="flex flex-col items-center justify-center text-center bg-indigo-600 text-white p-6">
			<aside className="flex flex-col items-center">
				<img src={Logo} width={100} height={100} alt="Kuisis Logo" />
				<p className="font-alfa-slab text-2xl mt-2">Kuisis</p>
				<p className="font-bold mb-2">Test your knowledge, anytime, anywhere</p>
				<p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
			</aside>
		</footer>
	);
}

export default Footer;
