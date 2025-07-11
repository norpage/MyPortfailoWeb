'use client';
import {useState, useEffect} from 'react';
import Loader from '@/components/Loader';

export default function AppLoader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000); // simulate delay
        return () => clearTimeout(timer);
    }, []);

    if (!loading) return null;

    return <Loader/>;
}
