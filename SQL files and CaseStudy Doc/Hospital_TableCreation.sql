-- Table: public.book_appointment

-- DROP TABLE IF EXISTS public.book_appointment;

CREATE TABLE IF NOT EXISTS public.book_appointment
(
    ssn_no integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    first_name character varying(30) COLLATE pg_catalog."default",
    last_name character varying(30) COLLATE pg_catalog."default",
    gender character varying(10) COLLATE pg_catalog."default",
    address character varying(100) COLLATE pg_catalog."default",
    mobile_no character varying(50) COLLATE pg_catalog."default",
    email character varying(25) COLLATE pg_catalog."default",
    doctor_name character varying(25) COLLATE pg_catalog."default",
    speciality character varying(25) COLLATE pg_catalog."default",
    appointment_date date,
    appointment_time time without time zone,
    CONSTRAINT book_appointment_pkey PRIMARY KEY (ssn_no)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.book_appointment
    OWNER to postgres;

