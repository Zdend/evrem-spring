package net.evrem.webapp.converter;


import net.evrem.webapp.domain.GridItem;
import net.evrem.webapp.form.GridItemForm;

public class GridItemFormToGridItemConverter {

	private static void setDefaultValues(GridItemForm form) {
		form.setX(1);
		form.setY(10000);
		form.setW(2);
		form.setH(1);
	}

	public static GridItem convertToGridItem(GridItemForm form, GridItem gridItem) {
		if (form == null || form.getX() == null || form.getY() == null || form.getW() == null || form.getH() == null) {
			setDefaultValues(form);
		}
		gridItem.setW(form.getW());
		gridItem.setH(form.getH());
		gridItem.setX(form.getX());
		gridItem.setY(form.getY());
		return gridItem;
	}

	public static GridItemForm convertToForm(GridItem gridItem, GridItemForm form) {
		if (form == null) {
			form = new GridItemForm();
		}

		form.setGridItemId(gridItem.getGridItemId());
		form.setW(gridItem.getW());
		form.setH(gridItem.getH());
		form.setX(gridItem.getX());
		form.setY(gridItem.getY());
		return form;
	}

}
