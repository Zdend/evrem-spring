package net.evrem.webapp.controller;

import net.evrem.webapp.domain.User;
import net.evrem.webapp.error.*;
import net.evrem.webapp.error.Error;
import net.evrem.webapp.form.GridItemForm;
import net.evrem.webapp.form.NoteFormModel;
import net.evrem.webapp.form.Response;
import net.evrem.webapp.form.TodoNoteForm;
import net.evrem.webapp.service.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.util.List;

/**
 * Created by T945051 on 19.6.2015.
 */
@Controller
@RequestMapping(value = "/rest")
public class NoteController {
    private final Logger logger = LoggerFactory.getLogger(getClass());

    private final String XLSX_MIME_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    @Autowired
    NoteService noteService;
    @Autowired
    TodoNoteService todoNoteService;
    @Autowired
    GridItemService gridItemService;
    @Autowired
    ExportService exportService;
    @Autowired
    FileService fileService;
    @Autowired
    UserService userService;

    @RequestMapping(value = "/note/save", method = RequestMethod.POST)
    public
    @ResponseBody
    Response<NoteFormModel> saveNote(@RequestBody NoteFormModel note) {
        Response<NoteFormModel> response = new Response<NoteFormModel>();
        try {
            NoteFormModel persistedNote = noteService.save(note, userService.getCurrentUser());
            response.setPayload(persistedNote);
        } catch (Exception e) {
            logger.error("Error during saving note", e);
            response.addError(new Error("NOTE_SAVE_EXCEPTION", e.getMessage()));
        }
        return response;
    }

    @RequestMapping(value = "/note/delete", method = RequestMethod.POST)
    public
    @ResponseBody
    Response<NoteFormModel> deleteNote(@RequestBody Long noteId) {
        Response<NoteFormModel> response = new Response<NoteFormModel>();
        try {
            NoteFormModel noteFormModel = noteService.delete(noteId);
            response.setPayload(noteFormModel);
        } catch (Exception e) {
            logger.error("Error during deleting note", e);
            response.addError(new Error("NOTE_DELETE_EXCEPTION", e.getMessage()));
        }
        return response;
    }

    @RequestMapping(value = "/note/check", method = RequestMethod.POST)
    public
    @ResponseBody
    Response<NoteFormModel> checkNote(@RequestBody Long noteId) {
        Response<NoteFormModel> response = new Response<NoteFormModel>();
        try {
            NoteFormModel noteFormModel = noteService.checkNote(noteId);
            response.setPayload(noteFormModel);
        } catch (Exception e) {
            logger.error("Error during checking note", e);
            response.addError(new Error("NOTE_CHECK_EXCEPTION", e.getMessage()));
        }
        return response;
    }

    @RequestMapping(value = "/note/todonote/check", method = RequestMethod.POST)
    public
    @ResponseBody
    Response<NoteFormModel> checkTodoNote(@RequestBody Long todoNoteId) {
        Response<NoteFormModel> response = new Response<NoteFormModel>();
        try {
            NoteFormModel noteForm = todoNoteService.checkTodoNote(todoNoteId);
            response.setPayload(noteForm);
        } catch (Exception e) {
            logger.error("Error during checking todo note", e);
            response.addError(new Error("NOTE_TODO_CHECK_EXCEPTION", e.getMessage()));
        }
        return response;
    }

    @RequestMapping(value = "/note/griditem/save", method = RequestMethod.POST)
    public
    @ResponseBody
    Response<List<GridItemForm>> saveCoordinates(@RequestBody List<GridItemForm> gridItemForms) {
        Response<List<GridItemForm>> response = new Response<List<GridItemForm>>();
        try {
            List<GridItemForm> gridItemFormsPersisted = gridItemService.saveGridItems(gridItemForms);
            response.setPayload(gridItemFormsPersisted);
        } catch (Exception e) {
            logger.error("Error during saving coordinates", e);
            response.addError(new Error("NOTE_GRIDITEM_SAVE_EXCEPTION", e.getMessage()));
        }
        return response;
    }

    @RequestMapping(value = "/note/all/deletepermanently", method = RequestMethod.POST)
    public
    @ResponseBody
    Response<List<Long>> deleteNotesPermanently() {
        Response<List<Long>> response = new Response<List<Long>>();
        try {
            List<Long> deletedNoteIds = noteService.deleteNotesPemanently(userService.getCurrentUser());
            response.setPayload(deletedNoteIds);
        } catch (Exception e) {
            logger.error("Error during emptying trash", e);
            response.addError(new Error("NOTE_DELETE_PERMANENTLY_EXCEPTION", e.getMessage()));
        }
        return response;
    }

    @RequestMapping(value = "/note/all/export", method = RequestMethod.POST)
    public
    @ResponseBody
    Response<String> exportAllNotes() {
        Response<String> response = new Response<String>();
        try {
            User user = userService.getCurrentUser();
            List<NoteFormModel> notes = noteService.getAllNotes(user);
            String exportedFilePath = exportService.getExportAllFile(notes, user.getUserId());
            response.setPayload(exportedFilePath);
        } catch (Exception e) {
            logger.error("Error during exporting all notes", e);
            response.addError(new Error("NOTE_EXPORT_ALL_EXCEPTION", e.getMessage()));
        }
        return response;
    }

    @RequestMapping(value = "/file/get/{fileName}", method = RequestMethod.GET)
    public void getExportedFileOfAllNotes(@PathVariable("fileName") String fileName, HttpServletResponse response) {
        try {
            response.reset();
            response.setContentType(XLSX_MIME_TYPE);
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");
            fileService.getFileFromTemp(fileName, response.getOutputStream());
            response.flushBuffer();

            fileService.deleteFileFromTemp(fileName);
        } catch (Exception e) {
            logger.error("Error writing file to output stream. Filename was: " + fileName, e);
        }


    }

}
