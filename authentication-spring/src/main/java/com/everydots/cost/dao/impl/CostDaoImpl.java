package com.everydots.cost.dao.impl;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.everydots.cost.domain.CostRecord;
import com.everydots.cost.common.Constants;
import com.everydots.cost.common.SQLs;
import com.everydots.cost.dao.CostDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.stereotype.Service;

@Service
public class CostDaoImpl implements CostDao {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public String insertRecords(final List<CostRecord> records) {
        jdbcTemplate.batchUpdate(SQLs.INSERT_COST_SQL, new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps, int index) throws SQLException {
                ps.setString(1, records.get(index).getId());
                ps.setString(2, records.get(index).getService_name());
                ps.setDouble(3, records.get(index).getCost());
            }

            @Override
            public int getBatchSize() {
                return records.size();
            }
        });
        return Constants.SUCCESS;
    }

    @Override
    public String insertRecord(final CostRecord record) {
        jdbcTemplate.update(SQLs.INSERT_COST_SQL, new PreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps) throws SQLException {
                ps.setString(1, record.getId());
                ps.setString(2, record.getService_name());
                ps.setDouble(3, record.getCost());
            }
        });
        return Constants.SUCCESS;
    }

    @Override
    public String updateRecord(final CostRecord record) {
        jdbcTemplate.update(SQLs.UPDATE_COST_BY_NAME, new PreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement ps) throws SQLException {
                ps.setDouble(1, record.getCost());
                ps.setString(2, record.getService_name());
            }
        });
        return Constants.SUCCESS;
    }

    @Override
    public List<CostRecord> retrieveRecords(CostRecord record) {
        return jdbcTemplate.queryForList(SQLs.SELECT_COST_BY_NAME_SQL,
                CostRecord.class, record.getService_name());
    }

    @Override
    public List<Map<String, Object>> statisticRecords() {
        return jdbcTemplate.queryForList(SQLs.STATISTIC_SERVICE_COST_SQL);
    }
}
