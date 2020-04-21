package net.evrem.webapp.domain;

import javax.persistence.*;

/**
 * Created by T945051 on 31.5.2015.
 */
@Entity
@Table(name = "GRID_ITEM")
public class GridItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "GRID_ITEM_ID", unique = true, nullable = false)
    private Long gridItemId;

    @Column(name = "W")
    private Integer w;

    @Column(name = "H")
    private Integer h;

    @Column(name = "X")
    private Integer x;

    @Column(name = "Y")
    private Integer y;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "NOTE_ID")
    private Note note;

    public Note getNote() {
        return note;
    }

    public void setNote(Note note) {
        this.note = note;
    }

    public Long getGridItemId() {
        return gridItemId;
    }

    public void setGridItemId(Long gridItemId) {
        this.gridItemId = gridItemId;
    }

    public Integer getW() {
        return w;
    }

    public void setW(Integer w) {
        this.w = w;
    }

    public Integer getH() {
        return h;
    }

    public void setH(Integer h) {
        this.h = h;
    }

    public Integer getX() {
        return x;
    }

    public void setX(Integer x) {
        this.x = x;
    }

    public Integer getY() {
        return y;
    }

    public void setY(Integer y) {
        this.y = y;
    }
}
