package com.RestApi.TeachAid.controller;

import com.RestApi.TeachAid.Repos.StudentRepo;
import com.RestApi.TeachAid.model.Student;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


import com.itextpdf.text.BaseColor;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StudentListPdfController {
  @Autowired
  private StudentRepo studentRepo;

  @GetMapping("pdf/generate/report")
  @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
  public ResponseEntity<Resource> generatePdfReport() throws IOException, DocumentException{
    List<Student> students = studentRepo.findAll();

    Document document = new Document(PageSize.A4, 25, 25, 25, 25);

    ByteArrayOutputStream os = new ByteArrayOutputStream();

    PdfWriter.getInstance(document, os);

    document.open();

    Paragraph title = new Paragraph("Information for Data Students",
        FontFactory.getFont(FontFactory.HELVETICA, 14, Font.BOLD, new BaseColor(0, 255, 255)));

    document.add(title);

    PdfPTable table = new PdfPTable(6);
    table.setSpacingBefore(25);
    table.setSpacingAfter(25);

    PdfPCell c1 = new PdfPCell(new Phrase("Id"));
    table.addCell(c1);

    PdfPCell c2 = new PdfPCell(new Phrase("Name"));
    table.addCell(c2);

    PdfPCell c3 = new PdfPCell(new Phrase("Last Name"));
    table.addCell(c3);

    PdfPCell c4 = new PdfPCell(new Phrase("Email"));
    table.addCell(c4);

    PdfPCell c5 = new PdfPCell(new Phrase("Grade"));
    table.addCell(c5);

    PdfPCell c6 = new PdfPCell(new Phrase("Course"));
    table.addCell(c6);

    for (Student student : students) {
      table.addCell(String.valueOf(student.getId()));
      table.addCell(student.getFirstName());
      table.addCell(student.getLastName());
      table.addCell(student.getEmail());
      table.addCell(String.valueOf(student.getGrade()));
      table.addCell(student.getCourse());
    }

    document.add(table);

    document.close();

    ByteArrayInputStream is = new ByteArrayInputStream(os.toByteArray());

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.parseMediaType("application/pdf"));
    headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
    headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=StudentPdfReport.pdf");

    ResponseEntity<Resource> response = new ResponseEntity<Resource>(new InputStreamResource(is), headers,
        HttpStatus.OK);

    return response;

  }
}
