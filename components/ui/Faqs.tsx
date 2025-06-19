"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

export default function CostradFaqs() {
  const faqData = [
    {
      key: "1",
      question: "What is the mission of COSTrAD?",
      answer:
        "COSTrAD aims to raise and develop generations of transformational leaders who are equipped to bring systemic and sustainable change across every sphere of society.",
    },
    {
      key: "2",
      question: "What makes COSTrAD different from traditional higher education institutions?",
      answer:
        "COSTrAD uses a modular, multi-disciplinary curriculum designed for real-world impact, emphasizing leadership, applied transformation, and sustainability over traditional theory-heavy models.",
    },
    {
      key: "3",
      question: "What are the eight spheres of influence COSTrAD focuses on?",
      answer:
        "The eight spheres include government, education, economy, media, arts, family, religion, and science—areas viewed as essential for national transformation.",
    },
    {
      key: "4",
      question: "Who can benefit from enrolling in COSTrAD programs?",
      answer:
        "Aspiring and current leaders, educators, policymakers, faith leaders, entrepreneurs, and anyone passionate about societal transformation will benefit from the practical, purpose-driven training.",
    },
    {
      key: "5",
      question: "What skills does COSTrAD emphasize for its transformational leaders?",
      answer:
        "Key skills include strategic communication, ethical decision-making, systems thinking, innovation, and the ability to lead people and manage complex systems.",
    },
    {
      key: "6",
      question: "How does COSTrAD support sustainable national development?",
      answer:
        "By equipping leaders to build strong institutions, transform belief systems, and influence critical sectors like education, economy, and governance.",
    },
    {
      key: "7",
      question: "Is COSTrAD affiliated with any religious or faith-based principles?",
      answer:
        "Yes, while COSTrAD is open to all, it is rooted in Kingdom values and integrates spiritual principles as part of its leadership and development framework.",
    },
    {
      key: "8",
      question: "How flexible are COSTrAD’s learning programs?",
      answer:
        "COSTrAD offers flexible, modular formats that allow students to integrate their learning with real-life responsibilities, enabling application while studying.",
    },
    {
      key: "9",
      question: "How do I apply to COSTrAD?",
      answer:
        "Interested individuals can visit the official COSTrAD website to explore current programs, modules, and application instructions.",
    },
  ];

  return (
    <Accordion type="multiple" className="w-full">
      {faqData.map((item) => (
        <AccordionItem key={item.key} value={item.key}>
          <AccordionTrigger className="text-base md:text-xl  hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-base md:text-xl py-2">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
