'use client';

import Header from "@/components/Header";
import { useEffect } from "react";

export default function AboutPage() {
  useEffect(() => {
    document.title = "About Us";
  }, []);

  return (
    <>
    <Header title="About Us"/>

    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="container mx-auto px-6 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="badge badge-primary badge-lg mb-6">About Us</div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              Connecting Talent With <span className="text-blue-400">Opportunity</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              We're building a platform that brings together job seekers, employers, recruitment agencies, and administrators to create meaningful career connections.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="btn btn-primary btn-lg">Get Started</button>
              <button className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-blue-900">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-slate-600">Job Seekers</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">5K+</div>
              <div className="text-slate-600">Companies</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-slate-600">Agencies</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-slate-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-slate-700 leading-relaxed mb-8">
              To create a transparent, efficient, and equitable job marketplace where talent meets opportunity without barriers. We believe everyone deserves access to meaningful work that drives growth and success.
            </p>
            <div className="flex gap-6 justify-center flex-wrap text-slate-700">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Transparent</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Efficient</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Equitable</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Built For Everyone
            </h2>
            <p className="text-xl text-slate-600">
              Our platform serves four distinct user groups
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              {
                title: 'Job Seekers',
                icon: '🔍',
                description: 'Find your dream job with smart matching and easy applications.',
              },
              {
                title: 'Employers',
                icon: '🏢',
                description: 'Discover top talent quickly with powerful hiring tools.',
              },
              {
                title: 'Agencies',
                icon: '🤝',
                description: 'Manage clients and placements efficiently in one place.',
              },
              {
                title: 'Admins',
                icon: '⚙️',
                description: 'Maintain platform quality with comprehensive controls.',
              }
            ].map((user, idx) => (
              <div key={idx} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body text-center">
                  <div className="text-5xl mb-3">{user.icon}</div>
                  <h3 className="card-title text-xl justify-center mb-2">{user.title}</h3>
                  <p className="text-slate-600">{user.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-blue-200">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Innovation',
                description: 'Embracing new technologies to deliver cutting-edge solutions.',
                icon: '💡'
              },
              {
                title: 'Integrity',
                description: 'Building trust through transparency and honest relationships.',
                icon: '🛡️'
              },
              {
                title: 'Inclusion',
                description: 'Creating equal opportunities for everyone, regardless of background.',
                icon: '🌍'
              }
            ].map((value, idx) => (
              <div key={idx} className="text-center">
                <div className="text-6xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                <p className="text-blue-100">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready To Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands who are already transforming their hiring experience
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="btn btn-lg bg-white text-blue-700 hover:bg-slate-100 border-none">
              Create Free Account
            </button>
            <button className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-blue-700">
              Schedule Demo
            </button>
          </div>
          <div className="flex gap-6 justify-center mt-8 text-sm">
            <span>Free to start</span>
            <span>No credit card</span>
            <span>Cancel anytime</span>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}