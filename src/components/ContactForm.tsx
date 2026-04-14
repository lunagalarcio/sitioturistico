'use client';

import { useState } from 'react';
import styles from './ContactForm.module.css';

interface ContactFormProps {
  onSubmit?: (data: FormData) => void;
}

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un email válido';
    }
    
    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es requerido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (onSubmit) {
      onSubmit(formData);
    }
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.success}>
        <div className={styles.successIcon}>✅</div>
        <h3>¡Mensaje Enviado!</h3>
        <p>Gracias por contactarnos. Te responderemos pronto.</p>
        <button 
          className={styles.resetButton}
          onClick={() => setIsSubmitted(false)}
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="nombre" className={styles.label}>Nombre completo *</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className={`${styles.input} ${errors.nombre ? styles.inputError : ''}`}
          placeholder="Tu nombre"
        />
        {errors.nombre && <span className={styles.error}>{errors.nombre}</span>}
      </div>

      <div className={styles.row}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            placeholder="tu@email.com"
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="telefono" className={styles.label}>Teléfono</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className={styles.input}
            placeholder="(415) 123 4567"
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="mensaje" className={styles.label}>Mensaje *</label>
        <textarea
          id="mensaje"
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          className={`${styles.textarea} ${errors.mensaje ? styles.inputError : ''}`}
          placeholder="¿En qué podemos ayudarte?"
          rows={5}
        />
        {errors.mensaje && <span className={styles.error}>{errors.mensaje}</span>}
      </div>

      <button 
        type="submit" 
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
      </button>
    </form>
  );
}