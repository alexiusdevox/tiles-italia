"use client"
import { siteConfig } from '@/config/site';
import React, { useState, useEffect } from 'react';

const DynamicCopyright = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <span className="text-sm text-gray-500 dark:text-gray-400">&copy; {currentYear} <a href={siteConfig.url} className="hover:text-gray-400">{siteConfig.name}</a>. All Rights Reserved.
    </span>
  );
};

export default DynamicCopyright;