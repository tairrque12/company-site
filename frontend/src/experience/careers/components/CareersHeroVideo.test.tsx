import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import {CareersHeroVideo} from "@/experience/careers/components/CareersHeroVideo.tsx";

describe('CareersHero', () => {
    it('should render a background video with autoplay, muted, loop, and plays inline', () => {
        render(<CareersHeroVideo/>)
        const video = screen.getByLabelText("Careers hero video")
        expect(video).toBeInTheDocument();
        expect(video).toHaveAttribute('autoplay');
        expect((video as HTMLVideoElement).muted).toBe(true);
        expect(video).toHaveAttribute('loop');
        expect(video).toHaveAttribute('playsInline')
    });
    it('should render the Careers Header title independent of the video', () => {
        render(<CareersHeroVideo/>)
        expect(screen.getByText('Careers')).toBeInTheDocument();
    });
    it('should have a subheading under Career Header', () => {
        render(<CareersHeroVideo/>)
        expect(screen.getByText('Build A World Of Amazing Abundance')).toBeInTheDocument();
    });
})