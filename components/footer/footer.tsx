"use client"

import { siteConfig } from "@/config/site"
import { useEffect, useState } from "react";
import DynamicCopyright from "@/components/footer/dynamic-copyright";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export default function Footer() {

    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    return (
        <>
            <footer className="bg-white border border-t-1 pb-16 md:pb-0 py-5">
                <div className="mx-auto w-full max-w-screen-xl px-3 lg:px-6">
                    <div className="grid grid-cols-2 gap-8 py-5 lg:py-10 md:grid-cols-5">
                        <div>
                            <h3 className="mb-6 font-semibold text-gray-900 dark:text-white">Buy from companies</h3>
                            <ul className="text-gray-500 dark:text-gray-400 text-sm">
                                <li className="mb-4">
                                    <a href="#" className="hover:text-gray-400">Product Catalog</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:text-gray-400">Special offers</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:text-gray-400">Purchase procedure</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-6 font-semibold text-gray-900 dark:text-white">Sell for Business</h3>
                            <ul className="text-gray-500 dark:text-gray-400 text-sm">
                                <li className="mb-4">
                                    <a href="#" className="hover:text-gray-400">Register as a supplier</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:text-gray-400">Benefits for suppliers</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:text-gray-400">Terms of safe</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-6 font-semibold text-gray-900 dark:text-white">Help & Support</h3>
                            <ul className="text-gray-500 dark:text-gray-400 text-sm">
                                <li className="mb-4">
                                    <a href="#" className="hover:text-gray-400">FAQs</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:text-gray-400">Contact us</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:text-gray-400">Technical support</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:text-gray-400">Buying Guide</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-6 font-semibold text-gray-900 dark:text-white">Information</h3>
                            <ul className="text-gray-500 dark:text-gray-400 text-sm">
                                <li className="mb-4">
                                    <a href="#" className="hover:text-gray-400">Accessibility</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:text-gray-400">Returns Policy</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:text-gray-400">Refund Policy</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:text-gray-400">Hiring Statistics</a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-6 font-semibold text-gray-900 dark:text-white">Legal</h3>
                            <ul className="text-gray-500 dark:text-gray-400 text-sm">
                                <li className="mb-4">
                                    <a href="#" className="hover:text-gray-400">Terms & Conditions</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:text-gray-400">Privacy Policy</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:text-gray-400">Cookies</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                    <div className="py-3 lg:py-6 flex flex-col-reverse md:flex-row sm:items-center sm:justify-between">
                        <DynamicCopyright />
                        <ul className="flex items-center pb-3 md:pb-0">
                            <li className="">
                                <a href="#" rel="noreferrer" target="_blank" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="size-5" fill="currentColor"><path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" /></svg>
                                    <span className="sr-only">Facebook</span>
                                </a>
                            </li>
                            <li className="ml-5">
                                <a href="#" rel="noreferrer" target="_blank" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="size-5" fill="currentColor"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>
                                    <span className="sr-only">Instagram</span>
                                </a>
                            </li>
                            <li className="ml-5">
                                <a href="#" rel="noreferrer" target="_blank" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="size-5" fill="currentColor"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" /></svg>
                                    <span className="sr-only">X | Twitter</span>
                                </a>
                            </li>
                            <li className="ml-5">
                                <a href="#" rel="noreferrer" target="_blank" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className="size-5" fill="currentColor"><path d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3 .8-3.4 5-20.3 6.9-28.1 .6-2.5 .3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z" /></svg>
                                    <span className="sr-only">Pinterest</span>
                                </a>
                            </li>
                            <li className="ml-5">
                                <a href="#" rel="noreferrer" target="_blank" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="size-5" fill="currentColor"><path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" /></svg>
                                    <span className="sr-only">YouTube</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    )
}