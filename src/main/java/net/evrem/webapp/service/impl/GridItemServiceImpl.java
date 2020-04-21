package net.evrem.webapp.service.impl;

import net.evrem.webapp.converter.GridItemFormToGridItemConverter;
import net.evrem.webapp.domain.GridItem;
import net.evrem.webapp.domain.Note;
import net.evrem.webapp.form.GridItemForm;
import net.evrem.webapp.repository.GridItemRepository;
import net.evrem.webapp.service.GridItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by T945051 on 26.6.2015.
 */
@Service("gridItemService")
public class GridItemServiceImpl implements GridItemService {

    @Autowired
    private GridItemRepository gridItemRepository;

    @Override
    public GridItem saveGridItem(GridItemForm gridItemForm){
        GridItem gridItem = null;
        if(gridItemForm.getGridItemId() != null){
            gridItem = gridItemRepository.findOne(gridItemForm.getGridItemId());
        }else{
            gridItem = new GridItem();
        }
        GridItemFormToGridItemConverter.convertToGridItem(gridItemForm, gridItem);

        return gridItemRepository.save(gridItem);
    }

    @Override
    public List<GridItemForm> saveGridItems(List<GridItemForm> gridItemForms){
        List<GridItemForm> gridItemFormsPersisted = new ArrayList<GridItemForm>();
        for(GridItemForm gridItemForm : gridItemForms){
            GridItem gridItem = saveGridItem(gridItemForm);
            gridItemFormsPersisted.add(GridItemFormToGridItemConverter.convertToForm(gridItem, null));
        }
        return gridItemFormsPersisted;
    }

    @Override
    public void deleteByNote(Note note){
        if(note.getGridItem() != null) {
            gridItemRepository.delete(note.getGridItem());
        }
    }


}
