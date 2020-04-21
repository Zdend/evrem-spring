package net.evrem.webapp.service;

import net.evrem.webapp.domain.GridItem;
import net.evrem.webapp.domain.Note;
import net.evrem.webapp.form.GridItemForm;

import java.util.List;

/**
 * Created by T945051 on 26.6.2015.
 */
public interface GridItemService {
    GridItem saveGridItem(GridItemForm gridItemForm);
    List<GridItemForm> saveGridItems(List<GridItemForm> gridItemForms);
    void deleteByNote(Note note);
}
