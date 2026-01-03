'use client';

import Link from 'next/link';
import {
    IconBrandTwitter,
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandLinkedin,
    IconBook,
} from '@tabler/icons-react';
import { Button } from '@/components/ui/Button';

const footerLinks = {
    company: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Blog', href: '/blog' },
        { label: 'Press', href: '/press' },
    ],
    resources: [
        { label: 'Help Center', href: '/help' },
        { label: 'Become a Teacher', href: '/teach' },
        { label: 'Affiliate Program', href: '/affiliates' },
        { label: 'Partnerships', href: '/partners' },
    ],
    legal: [
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'Accessibility', href: '/accessibility' },
    ],
};

export function Footer() {
    return (
        <footer className="bg-gray-50/50 border-t border-default-200/50 text-default-600 mt-auto">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="md:col-span-1">
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-2 items-center">
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                    <IconBook size={20} className="text-white" />
                                </div>
                                <span className="font-bold text-xl text-foreground">SkillStream</span>
                            </div>
                            <p className="text-small text-default-500 leading-relaxed">
                                Master new skills with live instructor-led classes or self-paced
                                recorded courses. Join thousands of learners today.
                            </p>
                            <div className="flex gap-2">
                                {[IconBrandTwitter, IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin].map((Icon, i) => (
                                    <Button key={i} isIconOnly size="sm" variant="flat" className="bg-white text-default-500 hover:text-primary hover:bg-blue-50 shadow-sm">
                                        <Icon size={18} />
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Company</h3>
                        <div className="flex flex-col gap-3">
                            {footerLinks.company.map((link) => (
                                <Link key={link.href} href={link.href} className="text-small hover:text-primary transition-colors flex items-center gap-1">
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Resources</h3>
                        <div className="flex flex-col gap-3">
                            {footerLinks.resources.map((link) => (
                                <Link key={link.href} href={link.href} className="text-small hover:text-primary transition-colors flex items-center gap-1">
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Legal</h3>
                        <div className="flex flex-col gap-3">
                            {footerLinks.legal.map((link) => (
                                <Link key={link.href} href={link.href} className="text-small hover:text-primary transition-colors flex items-center gap-1">
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-default-200/50 bg-white/50">
                <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-tiny text-default-400">
                        © 2026 SkillStream. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <p className="text-tiny text-default-400">Made with ❤️ for learners everywhere</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
