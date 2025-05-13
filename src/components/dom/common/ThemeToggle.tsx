import { useEffect, useState } from "react"
import nightwind from "nightwind/helper"
import { Button } from "~/ui/button"
import { Moon, Sun } from "lucide-react"

export default function ThemeToggle() {
	const [isDark, setIsDark] = useState(false)

	useEffect(() => {
		// Initialize state based on current theme
		setIsDark(document.documentElement.classList.contains("dark"))

		// Add event listener to track theme changes
		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (
					mutation.attributeName === "class" &&
					mutation.target === document.documentElement
				) {
					setIsDark(document.documentElement.classList.contains("dark"))
				}
			})
		})

		observer.observe(document.documentElement, { attributes: true })

		return () => observer.disconnect()
	}, [])

	const toggleTheme = () => {
		nightwind.toggle()
		setIsDark(!isDark)
	}

	return (
		<Button
			variant="outline"
			size="icon"
			className="ml-auto rounded-full cursor-pointer"
			onClick={toggleTheme}
			aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
		>
			{isDark ? (
				<Sun className="h-5 w-5" />
			) : (
				<Moon className="h-5 w-5" />
			)}
		</Button>
	)
}
