// lib/security.ts
import { z } from "zod";

// Input validation schemas
export const emailSchema = z.string().email().max(254);
export const passwordSchema = z.string().min(8).max(128);
export const nameSchema = z.string().min(1).max(100).regex(/^[a-zA-Z\s'-]+$/);
export const urlSchema = z.string().url().max(2048);

// Sanitization functions
export function sanitizeHtml(input: string): string {
  return input.replace(/<[^>]*>/g, '').trim();
}

export function sanitizeSql(input: string): string {
  // Basic SQL injection prevention - escape single quotes
  return input.replace(/'/g, "''");
}

// Rate limiting helper (basic implementation)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(identifier: string, maxRequests: number = 100, windowMs: number = 60000): boolean {
  const now = Date.now();
  const record = requestCounts.get(identifier);

  if (!record || now > record.resetTime) {
    requestCounts.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

// CSRF protection helper
export function generateCSRFToken(): string {
  return crypto.randomUUID();
}

// Content validation
export function validateContentLength(content: string, maxLength: number = 10000): boolean {
  return content.length <= maxLength;
}

export function containsMaliciousPatterns(input: string): boolean {
  const maliciousPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe[^>]*>/gi,
    /<object[^>]*>/gi,
    /<embed[^>]*>/gi,
  ];

  return maliciousPatterns.some(pattern => pattern.test(input));
}