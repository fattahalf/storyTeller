import { Input } from "@heroui/react";
import { DatePicker } from "@heroui/date-picker";
import { Textarea } from "@heroui/input";
import { Button } from "@heroui/react";
import { revalidatePath } from "next/cache";

async function addStory(formData) {
	"use server";

	const title = formData.get("title");
	const story = formData.get("story");
	const from = formData.get("owner");
	const date = formData.get("date");

	const res = await fetch("https://v1.appbackend.io/v1/rows/bkGtYB3YGRjb", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify([{ title: title, description: story, date: date, from: from }]),
	});

	revalidatePath("/");
}

export function Form() {
	return (
		<form
			className="mx-4 my-2 p-4 border rounded-lg shadow"
			action={addStory}>
			<div className="grid gap-4">
				<div className="flex gap-4">
					<Input
						isRequired
						name="title"
						type="text"
						label="Title"
						labelPlacement="outside"
						placeholder="Story Title"
					/>
					<Input
						isRequired
						name="owner"
						type="text"
						label="From"
						labelPlacement="outside"
						placeholder="Your name or your alias"
					/>
					<DatePicker
						isRequired
						name="date"
						labelPlacement="outside"
						label="Date"
					/>
				</div>
				<Textarea
					isRequired
					name="story"
					labelPlacement="outside"
					label="Story"
					placeholder="Tell us about your stories"
				/>
				<div className="flex justify-center">
					<Button
						type="submit"
						color="primary"
						className="w-32">
						Submit my story
					</Button>
				</div>
			</div>
		</form>
	);
}
