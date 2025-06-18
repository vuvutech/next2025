"use client"
import { Accordion, AccordionItem } from "@heroui/react";
import { LucideArrowLeft } from "lucide-react";
import Link from "next/link";

export default function FaqsComponent() {

    const faqData = [
        {
            key: "1",
            question: "What is the main purpose of this book?",
            answer:
                "The main purpose of this book is to educate and empower citizens, particularly Christians, on the importance of their votes in shaping political leadership and governance.",
        },
        {
            key: "2",
            question: "Who is the author of the book?",
            answer:
                "Dr. Abu Bako, an Economist by profession and a Founding President of the Logos-Rhema Foundation for Leadership Resource Development, authored this book.",
        },
        {
            key: "3",
            question: "What does Dr. Abu Bako recommend readers to do with these books?",
            answer:
                "Dr. Abu Bako recommends that these books be used as tools to sensitize citizens on the power of their vote and to become politically active Christians guided by the truth of God's Word.",
        },
        {
            key: "4",
            question: "How can the book help voters make informed decisions?",
            answer:
                "The book provides insights into understanding the impact of one's vote, the role of political candidates, and how voting impacts the nation at large.",
        },
        {
            key: "5",
            question: "What are some of the key themes covered in the book?",
            answer:
                "Key themes include the importance of good stewardship, the power of the vote, and becoming politically active Christians.",
        },
        {
            key: "6",
            question: "How does Dr. Abu Bako address the challenges faced by nations?",
            answer:
                "Dr. Abu Bako discusses the need to decentralize institutions, especially those of higher learning, to ensure more localized and effective governance.",
        },
        {
            key: "7",
            question: "What specific regions or countries is this book aimed at?",
            answer:
                "While not explicitly stated, the content suggests that the book is relevant for any region facing dissatisfaction with political leadership and seeking reform.",
        },
        {
            key: "8",
            question: "How can readers access the full text of the book?",
            answer: (
                <>
                    Readers can purchase or download the book from various online platforms such as Amazon, Google Books, or directly from the publisher's{" "}
                    <Link
                        href="https://www.costrad.org /the-book"
                        className="text-warning"
                        >
                        <span className="font-bold text-red-500">website</span>
                    </Link>.
                </>
            ),
        },
        {
            key: "9",
            question: "Are there any specific tools or resources included in the book?",
            answer:
                "The book includes valuable insights and practical guides on becoming a politically active Christian and understanding one’s role in governance.",
        },
        {
            key: "10",
            question: "How does Dr. Abu Bako believe decentralization can improve governance?",
            answer:
                "Dr. Abu Bako believes that by decentralizing institutions, especially those of higher learning, it can lead to more localized and effective governance tailored to specific regions' needs.",
        },
        {
            key: "11",
            question: "What are some challenges faced by nations discussed in the book?",
            answer:
                "The book discusses challenges such as frequent famines or flooding and food security, highlighting how these issues affect governance and voter behavior.",
        },
        {
            key: "12",
            question: "How can readers provide feedback on the book?",
            answer:
                "Readers can provide feedback through the publisher’s website, social media channels, or by contacting Dr. Abu Bako directly via email or his institutional affiliations.",
        },
    ];


    return (
        <Accordion>
            {faqData.map((item) => (
                <AccordionItem
                    indicator={<LucideArrowLeft className="text-primary" />}
                    key={item.key}
                    title={item.question}
                    aria-label={item.question}
                    classNames={{
                        title: ` text-4xl`,
                    }}
                >
                    <div className="text-base py-5">
                        {item.answer}
                    </div>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
