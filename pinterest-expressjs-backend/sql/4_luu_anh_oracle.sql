--------------------------------------------------------
--  File created - Thursday-December-28-2023
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table LUU_ANH
--------------------------------------------------------

  CREATE TABLE "SYSTEM"."LUU_ANH"
   (	"NGAY_LUU" DATE,
	"LUU_ANH_ID" NUMBER GENERATED BY DEFAULT AS IDENTITY MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE  NOKEEP  NOSCALE ,
	"NGUOI_DUNG_ID" NUMBER,
	"HINH_ID" NUMBER
   ) PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
REM INSERTING into SYSTEM.LUU_ANH
SET DEFINE OFF;
Insert into SYSTEM.LUU_ANH (NGAY_LUU,LUU_ANH_ID,NGUOI_DUNG_ID,HINH_ID) values (to_date('01-JAN-23','DD-MON-RR'),16,1,19);
Insert into SYSTEM.LUU_ANH (NGAY_LUU,LUU_ANH_ID,NGUOI_DUNG_ID,HINH_ID) values (to_date('02-JAN-23','DD-MON-RR'),17,21,20);
Insert into SYSTEM.LUU_ANH (NGAY_LUU,LUU_ANH_ID,NGUOI_DUNG_ID,HINH_ID) values (to_date('03-JAN-23','DD-MON-RR'),18,22,21);
Insert into SYSTEM.LUU_ANH (NGAY_LUU,LUU_ANH_ID,NGUOI_DUNG_ID,HINH_ID) values (to_date('01-JAN-23','DD-MON-RR'),21,1,20);
--------------------------------------------------------
--  DDL for Index PK_0b7e07c903a39f1bb02857fbd16
--------------------------------------------------------

  CREATE UNIQUE INDEX "SYSTEM"."PK_0b7e07c903a39f1bb02857fbd16" ON "SYSTEM"."LUU_ANH" ("LUU_ANH_ID")
  PCTFREE 10 INITRANS 2 MAXTRANS 255
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  Constraints for Table LUU_ANH
--------------------------------------------------------

  ALTER TABLE "SYSTEM"."LUU_ANH" MODIFY ("NGAY_LUU" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."LUU_ANH" MODIFY ("LUU_ANH_ID" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."LUU_ANH" ADD CONSTRAINT "PK_0b7e07c903a39f1bb02857fbd16" PRIMARY KEY ("LUU_ANH_ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table LUU_ANH
--------------------------------------------------------

  ALTER TABLE "SYSTEM"."LUU_ANH" ADD CONSTRAINT "FK_28ac49c1d26632bbc70c05d0cae" FOREIGN KEY ("NGUOI_DUNG_ID")
	  REFERENCES "SYSTEM"."NGUOI_DUNG" ("NGUOI_DUNG_ID") ENABLE;
  ALTER TABLE "SYSTEM"."LUU_ANH" ADD CONSTRAINT "FK_f71fc784a530b128a713b78f748" FOREIGN KEY ("HINH_ID")
	  REFERENCES "SYSTEM"."HINH_ANH" ("HINH_ID") ENABLE;
