import React from 'react';
import { ExternalLink, Mail, ChevronRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Introduction = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              Dhruval Dalwadi
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-400 mb-6">
              Full-Stack Developer who builds with one goal  🐐 domination.
            </h2>
            <p className="text-gray-soft text-lg mb-8 max-w-3xl leading-relaxed whitespace-pre-line">
              I craft React.js interfaces that don’t just look good they move, respond, and feel premium
              From idea to execution I build products that stand out.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="primary"
                icon={<ExternalLink size={18} />}
                onClick={() => window.open("/DHRUVAL_RESeME.pdf.pdf", "_blank")}
              >
                View Resume
              </Button>
              <Button
                variant="outline"
                icon={<Mail size={18} />}
                onClick={() => {
                  const subject = encodeURIComponent("hire me for modern development");
                  const body = encodeURIComponent(`Hey Dhruval,\n\nI just explored your portfolio and honestly… this isn’t just development, this is art 🔥\n\nThe way you build smooth UI, animations, and full-stack systems shows you're not just coding — you're crafting experiences.\n\nI have something exciting in mind and I believe you're the perfect person to bring it to life. Let’s collaborate and create something that people won’t just use… they’ll remember.\n\nIf you're ready to build something crazy and impactful, let’s connect.\n\nWaiting for your reply 👀\n\n– Your Future Client`);
                  window.location.href = `mailto:dhruvaldalwadi1907@gmail.com?subject=${subject}&body=${body}`;
                }}
              >
                Send Mail
              </Button>
            </div>
          </motion.div>

          <div className="flex justify-end mt-16">
            <Link
              to="/about"
              className="flex items-center gap-2 text-gray-soft hover:text-white transition-colors group"
            >
              <span className="text-sm">About Me</span>
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Introduction;
